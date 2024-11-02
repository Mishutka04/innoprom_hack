from collections import defaultdict
import json
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.views import APIView
from .utils import evaluate_reviews_with_llm, prepare_prompt
from .models import UserProfile, Methodology, StatusMethodology, FormAnswer, ResultMethodology, UserCard
from .serializers import UserProfileSerializer, MethodologySerializer, StatusMethodologySerializer, FormAnswerSerializer, ResultMethodologySerializer, UserCardSerializer
from rest_framework.response import Response

class CombinedUserProfileMethodologyView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')  # Get pk from the URL
        if not pk:
            return Response({"status": "Error"})
        user_profile = UserProfile.objects.get(id=pk)  # Fetch UserProfile by pk         

        methodologies = ResultMethodology.objects.filter(user=user_profile)
        user_card = UserCard.objects.filter(user=user_profile)

        # Serialize user profile
        user_profile_serializer = UserProfileSerializer(user_profile)  # No need for many=True since it's a single object
        user_card_serializer = UserCardSerializer(user_card, many=True)
        # Serialize methodologies
        methodology_serializer = ResultMethodologySerializer(methodologies, many=True)

        # Combine the data
        response_data = {
            "user_profile": user_profile_serializer.data,
            "methodologies": methodology_serializer.data,
            "user_card": user_card_serializer.data,
        }
        print(response_data)
        return Response(response_data)


class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class MethodologyListCreateView(generics.ListCreateAPIView):
    queryset = Methodology.objects.all()
    serializer_class = MethodologySerializer

class StatusMethodologyListCreateView(generics.ListCreateAPIView):
    queryset = StatusMethodology.objects.all()
    serializer_class = StatusMethodologySerializer

class FormAnswerListCreateView(generics.ListCreateAPIView):
    queryset = FormAnswer.objects.all()
    serializer_class = FormAnswerSerializer

class ResultMethodologyListCreateView(generics.ListCreateAPIView):
    queryset = ResultMethodology.objects.all()
    serializer_class = ResultMethodologySerializer


class EvaluateReviewsView(APIView):
    def post(self, request, *args, **kwargs):
        # Get all FormAnswer instances
        form_answers = FormAnswer.objects.all()
    
        # Step 2: Create a dictionary to group users by their IDs
        user_groups = defaultdict(list)
    
        for form_answer in form_answers:
            user_id = form_answer.user.id  # Get user ID
            user_groups[user_id].append(form_answer)  # Append user to the corresponding ID group
    

        results = []
        
        for user_id in user_groups.keys():
            reviews = []
            metodic = []
            metod = None
            user = None
            for query in user_groups[user_id]:
                print("TEST", query.methodology)
                # Extract methodology and answers
                methodology = query.methodology
                answers = query.answers['answer']
                if not metod or user:
                    metod = query.methodology
                    user = query.user
                    
                if not metodic:
                    
                    metodic = [item['criteria'] for item in query.methodology.criteria ]
                # Prepare reviews based on methodology
                reviews.append(answers)
            
                # Prepare the prompt
            prompt = prepare_prompt(reviews, metodic)
            
            # Evaluate the reviews with LLM
            evaluation_result = evaluate_reviews_with_llm(prompt)
            # # evaluation_result_json = json.dumps(evaluation_result, ensure_ascii=False, indent=4)
        
            result_methodology = ResultMethodology(
                user=user,
                methodology=methodology,
                matrix_competence=evaluation_result  # Используйте matrix_competence если это JSONField
            )

            # Сохраняем объект в базе данных
            result_methodology.save()
            
            # Save results (you may need to adjust this part based on your model)
        return JsonResponse({'results': "Okey"}, status=200)