from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken

from .api import FlightsSerializer
from .models import Flights
from rest_framework import generics

from django.db.models import Sum

# Create your views here.
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# dynamically filter database off of url
class Filter3ViewSet(generics.ListAPIView):
    serializer_class = FlightsSerializer
    # queryset = Flights.objects.none()
    

    def get_queryset(self):
        # user = self.request.user
        tail_number = self.kwargs['tail_number']
        # model = Flights
        return Flights.objects.filter(tail_number=tail_number)
        # return Flights.objects.filter(tail_number=tail_number).aggregate(Sum('pic'))
        #return Flights.objects.all().aggregate(Sum('pic'))

    # def get_context_data(self, **kwargs):
