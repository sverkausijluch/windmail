from rest_framework import serializers
from .models import Poll, Option, Voice, Profile, Comment, Tag, Room, Answer, Notification, Main_room, Group
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404

class OptionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'text')

class TagNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']
        
class MainProfileInfoSerializer(serializers.HyperlinkedModelSerializer):
    user = UserIdSerializer(many=False, read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'name', 'avatar', 'color', 'user']
        
class PollSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False, read_only=True)
    tags = TagNameSerializer(many=True, read_only=True)
    options = OptionSerializer(many=True, read_only=True)
    class Meta:
        model = Poll
        fields = ['id', 'question', 'author', 'created_at', 'views', 'tags', 'options']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'poll']

class VoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voice
        fields = ['id', 'option']

class SmallGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'type', 'name']
        
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'type', 'name']
        
class ProfileCreateSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'name', 'city', 'email', 'avatar', 'groups', 'cover', 'post_text', 'post_image', 'post_title', 'post_created_at', 'webcite', 'color']
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'city', 'email', 'avatar', 'cover', 'post_text', 'post_image', 'post_title', 'post_created_at', 'webcite', 'color']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileCreateSerializer(many=False, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'profile']

class UserSignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

class UserRegisterSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style = {'input_type':'password'}, write_only=True)
    
    class Meta:
        model = User
        fields=['email','username','password','password2']
        extra_kwargs = {
            'password':{'write_only':True}
        }
    
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.pop('password2')
        if password != password2:
            raise serializer.ValidationError("Password and Confirm Password Does not match")
        return attrs
    
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)

    def validate_email(self, value):
        exist_contact = User.objects.filter(email=value)
        if exist_contact:
            email = get_object_or_404(User, email=value)
            if email != '':
                raise serializers.ValidationError('Указанная почта уже используется')
        return value


class MainProfileInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'avatar', 'color']

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author', 'poll', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author', 'poll', 'created_at']

class RoomSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'author', 'created_at', 'message', 'views']

class CreateRoomSerializer(serializers.ModelSerializer):
    tags = TagNameSerializer(many=True, read_only=True)
    class Meta:
        model = Room
        fields = ['id', 'name', 'author', 'created_at', 'message', 'views', 'tags', 'color', 'cover']

class RoomSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    tags = TagNameSerializer(many=True, read_only=True)
    class Meta:
        model = Room
        fields = ['id', 'name', 'author', 'created_at', 'message', 'views', 'tags', 'color', 'cover', 'saved_by']

class RoomListSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    answers_count = serializers.IntegerField(
        source='answers.count',
        read_only=True
    )
    class Meta:
        model = Room
        fields = ['id', 'name', 'author', 'answers_count', 'cover']


class AnswerSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    class Meta:
        model = Answer
        fields = ['id', 'text', 'author', 'room', 'created_at']

class CreateAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'author', 'room', 'created_at']

class NotificationSerializer(serializers.ModelSerializer):
    sender = MainProfileInfoSerializer(many=False, read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'text', 'type', 'created_at', 'object', 'sender']

class NotificationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'text', 'type', 'created_at', 'object', 'sender', 'recipients']

class SmallMainRoomsSerializer(serializers.ModelSerializer):
    room = CreateRoomSerializer(many=False, read_only=True)
    class Meta:
        model = Main_room
        fields = ['room', 'type', 'cover']
        
class ProfileGroupsSerializer(serializers.ModelSerializer):
    groups = SmallGroupSerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = ['groups']






