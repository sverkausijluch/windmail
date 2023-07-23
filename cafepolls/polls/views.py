from .models import Poll, Option, Voice, Profile, Comment, Tag, Room, Answer, Notification, Main_room
from .serializers import PollSerializer, VoiceSerializer, OptionSerializer, UserSerializer, UserIdSerializer, ProfileGroupsSerializer, UserRegisterSerializer, ProfileSerializer, \
    CommentSerializer, CreateCommentSerializer, TagNameSerializer, RoomSerializer, RoomListSerializer, RoomSimpleSerializer, AnswerSerializer, \
    CreateAnswerSerializer, ProfileCreateSerializer, CreateRoomSerializer, NotificationSerializer, NotificationCreateSerializer, SmallMainRoomsSerializer
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login
from rest_framework.parsers import MultiPartParser
from django.db.models import Q
from django.db.models import F
from django.db.models import Count

    
class PollView(viewsets.ViewSet):
    def list(self, request):
        queryset = Poll.objects.all()
        serializer = PollSerializer(queryset, many=True)
        return Response({'polls': serializer.data})

    def retrieve(self, request, pk=None):
        queryset = Poll.objects.all()
        poll = get_object_or_404(queryset, pk=pk)
        serializer = PollSerializer(poll)
        return Response(serializer.data)

    def create(self, request):
        serializer_class = PollSerializer
        data = request.data
        tags = request.POST.getlist('tags[]')
        serializer = PollSerializer(data=data)
        user = request.user.profile
        poll_id = int(request.POST.get('poll_id'))
        if poll_id == 0:
            if serializer.is_valid(raise_exception=True):
                new_poll = serializer.save(author=user, tags=tags)
                return JsonResponse({"poll": serializer.data, 'edit_res': 1}, safe=False)
        else:
            queryset = Poll.objects.all()
            poll = get_object_or_404(queryset, pk=poll_id)
            serializer = PollSerializer(poll, data=data)
            if not serializer.is_valid():
                return JsonResponse(status=400, data=serializer.errors)
            serializer.save(tags=tags)
            return JsonResponse({"poll": serializer.data,'poll_id':poll_id,'edit_res':1})
        return JsonResponse("что это за форма такая")
        
    def delete(self, request, poll_id):
        queryset = Poll.objects.all()
        poll = get_object_or_404(queryset, pk=poll_id)
        poll.delete()
        return JsonResponse(":3")

    def poll_list(self, request):
        tags = request.POST.getlist('tags[]')
        search_str = request.POST.get('search_str')
        section = request.POST.get('section')
        showed_polls_count = int(request.POST.get('showed_polls_count'))
        user_id = request.user.id
        poll_list = Poll.objects.all()
        # sections: 1 - популярное, 2 - новое, 3 - избранное
        if section == '3':
            poll_list = poll_list.filter(saved_by=(user_id)).distinct()
        if tags != []:
            poll_list = poll_list.filter(tags__in=(tags)).distinct()
        if search_str != '':
            poll_list = poll_list.filter(Q(question__icontains=search_str)).distinct()
        if section == '2':
            poll_list = poll_list.order_by('-created_at')
        if section == '1':
            poll_list = poll_list.order_by('views')
        poll_list = poll_list[showed_polls_count:showed_polls_count+30]
        polls_count = poll_list.count()
        serializer = PollSerializer(poll_list, many=True)
        return Response({'polls': serializer.data, 'polls_count': polls_count})

    def get_voice(self, request, id):
        voices = Voice.objects.filter(option__poll__pk = id, author = request.user)
        serializer = VoiceSerializer(voices, many=True)
        if(serializer.data != []):
            return Response(1)
        else:
            return Response(0)

    def save_poll(self, request, poll_id):
        saved_status = int(request.POST.get('saved_status'))
        user = request.user
        queryset = Poll.objects.all()
        poll = get_object_or_404(queryset, pk=poll_id)
        if saved_status == 0:
            poll.saved_by.add(user)
            poll.save()
            status = 1
        else:
            poll.saved_by.remove(user)
            poll.save()
            status = 0
        return JsonResponse(status, safe=False)
    
    def is_poll_saved(self, request, poll_id):
        user = request.user
        poll = Poll.objects.all().filter(id=poll_id).filter(saved_by__id__icontains=user.id)
        if poll.exists():
            status = 1
        else:
            status = 0
        return JsonResponse(status, safe=False)
        
    def new_polls_retrieve(self, request, count):
        queryset = Poll.objects.all()
        polls = queryset.order_by('-pk')[:count]
        serializer = PollSerializer(polls, many=True)
        return Response(serializer.data)

class TagView(viewsets.ViewSet):
    def list_filter(self, request):
        queryset = Tag.objects.all().exclude(id=3).annotate(cnt=Count('poll')).order_by('-cnt').distinct()
        search_str = request.POST.get('search_str')
        tag_list = queryset.filter(Q(name__icontains=search_str)).distinct()[:10]
        serializer = TagNameSerializer(tag_list, many=True)
        return Response({'tags': serializer.data})

    def room_list_filter(self, request):
        queryset = Tag.objects.all().exclude(id=3).annotate(cnt=Count('room')).order_by('-cnt').distinct()
        search_str = request.POST.get('search_str')
        tag_list = queryset.filter(Q(name__icontains=search_str)).distinct()[:10]
        serializer = TagNameSerializer(tag_list, many=True)
        return Response({'tags': serializer.data})

    def popular_list(self, request):
        queryset = Tag.objects.all().exclude(id=3).annotate(cnt=Count('room')).order_by('-cnt').distinct()
        serializer = TagNameSerializer(queryset, many=True)
        return Response({'tags': serializer.data})
    
    def tag_list(self, request):
        tags = request.POST.getlist('tags[]')
        tags = list(map(int, tags))
        queryset = Tag.objects.all().exclude(id=3).filter(id__in=(tags)).distinct()
        serializer = TagNameSerializer(queryset, many=True)
        return Response({'tags': serializer.data})

class OptionView(viewsets.ViewSet):
    def create(self, request, poll_id):
        data = request.data
        text = data.get('text')
        option_id = data.get('option_id')
        option_data = {
            'text': text,
            'poll': poll_id
        }
        if option_id == "0":
            serializer = OptionSerializer(data=option_data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse({"res": 1, "option": serializer.data}, safe=False)
        else:
            queryset = Option.objects.all()
            option = get_object_or_404(queryset, pk=option_id)
            if text == '':
                option.delete()
                return JsonResponse({"res": 0}, safe=False)
            else:
                serializer = OptionSerializer(option, data=option_data)
                if not serializer.is_valid():
                    return JsonResponse(status=400, data=serializer.errors)
                serializer.save()
                return JsonResponse({"res": 1, "option": serializer.data, "text": text}, safe=False)
        return JsonResponse("что это за форма такая")

class VoiceView(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        user = request.user
        serializer = VoiceSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=user)
            return JsonResponse({"data": data}, safe=False)
        else:
            return JsonResponse({"data": 'ОШИБКА'}, safe=False)

    def get_voices(self, request, poll_id):
        options = Option.objects.filter(poll__pk=poll_id)
        voices_list = []
        for opt in options:
            voices = Voice.objects.all().filter(option=opt.id)
            count = len(voices)
            voices_list.append(count)
        return Response(voices_list)

class UserView(viewsets.ViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request):
        data = request.data
        serializer = UserRegisterSerializer(data=data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        user = serializer.save()
        login(request, user)
        return JsonResponse({"data": data}, safe=False)

    def retrieve(self, request):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=request.user.pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
        
    def retrieve_id_by_profile(self, request, profile_id):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, profile__pk=profile_id)
        serializer = UserIdSerializer(user)
        return Response(serializer.data)

    def login(self, request):
        data = request.data
        user = data.get_user()
        login(request, user)
        return JsonResponse({"res": data}, safe=False)

class ProfileView(viewsets.ViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    parser_classes = (MultiPartParser,)

    def create(self, request):
        data = request.data
        user = request.user
        groups = [7]
        serializer = ProfileCreateSerializer(data=data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        profile = serializer.save(user=user,groups=groups)
        return Response({"data": serializer.data})

    def retrieve_by_id(self, request, user_id):
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=user_id)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def retrieve_my_profile(self, request):
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=request.user.profile.pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def update(self, request):
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=request.user.profile.pk)
        serializer = ProfileSerializer(profile, data=request.data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        serializer.save()
        return Response(serializer.data)
    
    def retrieve_user_groups(self, request, user_id):
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=user_id)
        serializer = ProfileGroupsSerializer(profile)
        return Response(serializer.data)

class CommentView(viewsets.ViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def create(self, request, poll_id):
        data = request.data
        user = request.user
        text = data.get('text')
        option_data = {
            'text': text,
            'poll': poll_id,
            'author': user.profile.pk
        }
        serializer = CreateCommentSerializer(data=option_data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        serializer.save()
        comment = Comment.objects.get(pk=serializer.data.get('id'))
        show_serializer = CommentSerializer(comment)
        return Response(show_serializer.data)

    def retrieve(self, request, poll_id):
        comments = Comment.objects.filter(poll__pk = poll_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
        
    def delete(self, request, comment_id):
        queryset = Comment.objects.all()
        comment = get_object_or_404(queryset, pk=comment_id)
        comment.delete()
        return Response(":3")

class RoomView(viewsets.ViewSet):
    def room_list(self, request):
        tags = request.POST.getlist('tags[]')
        search_str = request.POST.get('search_str')
        section = str(request.POST.get('section'))
        showed_rooms_count = int(request.POST.get('showed_rooms_count'))
        user_id = request.user.id
        room_list = Room.objects.all().exclude(tags__in=([3,])).distinct()
        # sections: 1 - popular
        if section == "3":
            room_list = room_list.filter(author__pk=(user_id)).distinct()
        if section == "1":
            room_list = room_list.order_by('-views')
        if search_str != '':
            room_list = room_list.filter(Q(name__icontains=search_str)).distinct()
        if tags != []:
            room_list = room_list.filter(tags__in=(tags)).distinct()
        if section == "2":
            room_list = room_list.order_by('-created_at')
        if section == "4":
            room_list = room_list.filter(saved_by=(user_id)).distinct()
        room_list = room_list[showed_rooms_count:showed_rooms_count+10]
        serializer = RoomListSerializer(room_list, many=True)
        rooms_count = room_list.count()
        return Response({'rooms': serializer.data, 'rooms_count': rooms_count})

    def retrieve(self, request, pk):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=pk)
        serializer = RoomSerializer(room)
        return Response(serializer.data)

    def create(self, request):
        parser_classes = (MultiPartParser,)
        data = request.data
        room_id = int(request.POST.get('room_id'))
        user = request.user.profile
        tags = request.POST.getlist('tags[]')
        if(room_id==0):
            serializer = CreateRoomSerializer(data=data)
            if not serializer.is_valid():
                return JsonResponse(status=400, data=serializer.errors)
            new_room = serializer.save(author=user, tags=tags)
            return JsonResponse({"data": serializer.data,'room_id':new_room.id, 'tags':tags}, safe=False)
        else:
            queryset = Room.objects.all()
            room = get_object_or_404(queryset, pk=room_id)
            serializer = CreateRoomSerializer(room, data=data)
            if not serializer.is_valid():
                return JsonResponse(status=400, data=serializer.errors)
            room = serializer.save(tags=tags)
            return JsonResponse({'room_id':room.id})
        return JsonResponse("что это за форма такая")
    
    def delete(self, request, room_id):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=room_id)
        room.delete()
        return JsonResponse({"res":":3"}, safe=False)
    
       
    def save_room(self, request, room_id):
        saved_status = int(request.POST.get('saved_status'))
        user = request.user
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=room_id)
        if saved_status == 0:
            room.saved_by.add(user)
            room.save()
            status = 1
        else:
            room.saved_by.remove(user)
            room.save()
            status = 0
        return JsonResponse(status, safe=False)
        
    def new_rooms_retrieve(self, request, count):
        queryset = Room.objects.all()
        polls = queryset.order_by('-pk')[:count]
        serializer = RoomSerializer(polls, many=True)
        return Response(serializer.data)
        
    def is_room_saved(self, request, room_id):
        user = request.user
        room = Room.objects.all().filter(id=room_id).filter(saved_by__id__icontains=user.id)
        if room.exists():
            status = 1
        else:
            status = 0
        return JsonResponse(status, safe=False)
        
    def send_view(self, request, room_id):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=room_id)
        room.views+=1
        room.save()
        return JsonResponse(room.views, safe=False)


class AnswerView(viewsets.ViewSet):
    def list(self, request, room_id):
        showed_answers_count = int(request.POST.get('showed_answers_count'))
        section = int(request.POST.get('section'))
        if(section==1):
            queryset = Answer.objects.all().filter(room__pk=room_id).order_by('-created_at')[showed_answers_count:showed_answers_count+10]
        else:
            queryset = Answer.objects.all().filter(room__pk=room_id)[showed_answers_count:showed_answers_count+10]
        serializer = AnswerSerializer(queryset, many=True)
        answers_count = queryset.count()
        return Response({'answers': serializer.data, 'answers_count': answers_count})

    def create(self, request, room_id):
        data = request.data
        user = request.user.profile.pk
        text = data.get('text')
        edit_status = int(data.get('edit_status'))
        if(edit_status==0):
            option_data = {
                'text': text,
                'room': room_id,
                'author': user
            }
            serializer = CreateAnswerSerializer(data=option_data)
            if not serializer.is_valid():
                return JsonResponse(status=400, data=serializer.errors)
            serializer.save()
            answer = Answer.objects.get(pk=serializer.data.get('id'))
            show_serializer = AnswerSerializer(answer)
            return Response(show_serializer.data)
        else:
            queryset = Answer.objects.all()
            answer = get_object_or_404(queryset, pk=edit_status)
            serializer = CreateAnswerSerializer(answer, data=data)
            if not serializer.is_valid():
                return JsonResponse(status=400, data=serializer.errors)
            answer = serializer.save()
            show_serializer = AnswerSerializer(answer)
            return JsonResponse({'answer':show_serializer.data,'edit_res':1}, safe=False)
            
    def delete(self, request, answer_id):
        queryset = Answer.objects.all()
        answer = get_object_or_404(queryset, pk=answer_id)
        answer.delete()
        return JsonResponse(":3")

class NotificationView(viewsets.ViewSet):
    def list(self, request):
        user = request.user
        queryset = Notification.objects.all().filter(recipients=user).order_by('-id')[:10]
        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        user = request.user
        #profile = Profile.objects.get(pk=user.pk)
        text = data.get('text')
        recipients = data.getlist('recipients[]')
        type = data.get('type')
        object = data.get('object')
        option_data = {
            'text': text,
            'object': object,
            'type': type,
            'recipients': recipients,
            'sender': user.profile.pk
        }
        serializer = NotificationCreateSerializer(data=option_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
    
    def get_new(self, request):
        user = request.user
        queryset = Notification.objects.all().filter(recipients=user)[:10]
        res = 0
        for notif in queryset:
            if notif.viewed == False:
                res = 1
                return Response(res)
        return Response(res)
    
    def show_new_notifs(self, request):
        user = request.user
        queryset = Notification.objects.all().filter(recipients=user)[:10]
        for notif in queryset:
            if notif.viewed == False:
                notif.viewed = True
                notif.save()
        return Response('ok')

class MainRoomsView(viewsets.ViewSet):
    def list(self, request, rooms_count):
        rooms_count = int(rooms_count)
        queryset = Main_room.objects.all().filter(type=1).order_by('-id')[:rooms_count]
        serializer = SmallMainRoomsSerializer(queryset, many=True)
        return Response(serializer.data)
        
    def mainlist(self, request):
        queryset = Main_room.objects.all().filter(type=0).order_by('-id')[:3]
        serializer = SmallMainRoomsSerializer(queryset, many=True)
        return Response(serializer.data)
        
class SearchView(viewsets.ViewSet):
    def list(self, request):
        search_str = request.POST.get('search_str')
        room_list = Room.objects.all().filter(Q(name__icontains=search_str)).distinct()
        rooms_serializer = RoomListSerializer(room_list, many=True)
        poll_list = Poll.objects.all().filter(Q(question__icontains=search_str)).distinct()
        polls_serializer = PollSerializer(poll_list, many=True)
        user_list = Profile.objects.all().filter(Q(name__icontains=search_str)).distinct()
        users_serializer = ProfileSerializer(user_list, many=True)
        return Response({'rooms': rooms_serializer.data,'polls': polls_serializer.data,'users': users_serializer.data})