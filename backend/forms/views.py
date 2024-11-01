from rest_framework import generics
from .models import UserProfile, Methodology, StatusMethodology, FormAnswer, ResultMethodology
from .serializers import UserProfileSerializer, MethodologySerializer, StatusMethodologySerializer, FormAnswerSerializer, ResultMethodologySerializer

class UserProfileListCreateView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class MethodologyListCreateView(generics.RetrieveAPIView):
    queryset = Methodology.objects.all()
    serializer_class = MethodologySerializer

class StatusMethodologyListCreateView(generics.RetrieveAPIView):
    queryset = StatusMethodology.objects.all()
    serializer_class = StatusMethodologySerializer

class FormAnswerListCreateView(generics.RetrieveAPIView):
    queryset = FormAnswer.objects.all()
    serializer_class = FormAnswerSerializer

class ResultMethodologyListCreateView(generics.RetrieveAPIView):
    queryset = ResultMethodology.objects.all()
    serializer_class = ResultMethodologySerializer
