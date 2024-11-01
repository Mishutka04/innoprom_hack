from rest_framework import generics
from .models import UserProfile, Methodology, StatusMethodology, FormAnswer, ResultMethodology
from .serializers import UserProfileSerializer, MethodologySerializer, StatusMethodologySerializer, FormAnswerSerializer, ResultMethodologySerializer
from rest_framework.response import Response

class CombinedUserProfileMethodologyView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')  # Get pk from the URL
        if not pk:
            return Response({"status": "Error"})
        user_profile = UserProfile.objects.get(id=pk)  # Fetch UserProfile by pk         

        methodologies = ResultMethodology.objects.filter(user=user_profile)

        # Serialize user profile
        user_profile_serializer = UserProfileSerializer(user_profile)  # No need for many=True since it's a single object

        # Serialize methodologies
        methodology_serializer = ResultMethodologySerializer(methodologies, many=True)

        # Combine the data
        response_data = {
            "user_profile": user_profile_serializer.data,
            "methodologies": methodology_serializer.data,
        }

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
