
from rest_framework import serializers
from .models import NeedAnswer, UserProfile, Methodology, StatusMethodology, FormAnswer, ResultMethodology, UserCard

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

class NeedAnswerSerializer(serializers.ModelSerializer):
    user_given = UserProfileSerializer()  # Вложенный сериализатор для user_given
    user_accept = UserProfileSerializer()  # Вложенный сериализатор для user_accept
    methodology = MethodologySerializer()  # Вложенный сериализатор для methodology

    class Meta:
        model = NeedAnswer
        fields = "__all__"  
        
class NeedAnswerSerializer2(serializers.ModelSerializer):
    class Meta:
        model = NeedAnswer
        fields = "__all__"  