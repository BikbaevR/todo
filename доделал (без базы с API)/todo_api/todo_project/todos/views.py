from django.shortcuts import render

from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Todo
from .serializers import TodoSerializer, UserSerializer, TodoStatusUpdateSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


    @action(detail=True, methods=['patch'], serializer_class=TodoStatusUpdateSerializer)
    def change_status(self, request, pk=None):
        todo = self.get_object()
        serializer = TodoStatusUpdateSerializer(todo, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

