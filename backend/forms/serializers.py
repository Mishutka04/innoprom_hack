
from rest_framework import serializers
from .models import UserProfile, Methodology, StatusMethodology, FormAnswer, ResultMethodology, UserCard

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"

class MethodologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Methodology
        fields = "__all__"


class StatusMethodologySerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusMethodology
        fields = "__all__"


class FormAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormAnswer
        fields = "__all__"


class ResultMethodologySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultMethodology
        fields = "__all__"
        
        
class UserCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCard
        fields = "__all__"