
from rest_framework import serializers
from .models import UserProfile, Methodology, StatusMethodology, FormAnswer, ResultMethodology

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'photo', 'full_name', 'birth_date', 'department', 'position', 'start_date']


class MethodologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Methodology
        fields = ['id', 'name', 'criteria']


class StatusMethodologySerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusMethodology
        fields = ['id', 'user', 'methodology', 'status']


class FormAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormAnswer
        fields = ['id', 'user', 'methodology', 'answers']


class ResultMethodologySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultMethodology
        fields = ['id', 'user', 'methodology', 'result', 'description', 'created_at']