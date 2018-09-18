from rest_framework import serializers, viewsets
from .models import Flights, Aircraft

from django.db.models import Sum, Count


class FlightsSerializer(serializers.HyperlinkedModelSerializer):
    pic_count = serializers.IntegerField()

    class Meta:
        model = Flights
        fields = ('name', 'remarks', 'created_at', 'no_instument_app',
                  'no_ldg', 'cross_country', 'pic', 'dual_rec', 'actual_instr',
                  'sim_instr', 'day', 'night', 'airports_visited', 'fly_date',
                  'snippet', 'tail_number', 'license_type', 'man_type', 'pic_count')
                  # added pic_count 

    def create(self, validated_data):
        user = self.context['request'].user
        flight = Flights.objects.create(user=user, **validated_data)
        return flight


class FlightsViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsSerializer
    queryset = Flights.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Flights.objects.filter(user=user)


class AircraftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Aircraft
        fields = ('man_type', 'tail_number', 'license_type')

    def create(self, validated_data):
        user = self.context['request'].user
        aircraft = Aircraft.objects.create(user=user, **validated_data)
        return aircraft


class AircraftViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Aircraft.objects.all()
        else:
            return Aircraft.objects.filter(user=user)

# hard coded way of filtering aircraft
# need to reimplement the user filter
class FilterAircraftViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()

    def get_queryset(self):
        user = self.request.user
        return Aircraft.objects.filter(license_type='sel')

        # if user.is_anonymous:
        # else:
        #     return Aircraft.objects.filter(user=user)


# tried to aggregate filtered data.  Multiple attempts.  Not yet working also needs to reimplement user filter
class FilterFlightsViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsSerializer
    queryset = Flights.objects.none()

    def get_queryset(self):
        # import pdb; pdb.set_trace()
        # user = self.request.user
        # print(Flights.objects.filter(tail_number='tailnumber1'))
        # return Flights.objects.filter(tail_number='tailnumber1').aggregate(Sum('pic'))
        # return Flights.objects.filter(tail_number='tailnumber1').annotate(name_count=Count('pic')).aggregate(Sum('pic'))
        # return Flights.objects.all().aggregate(Sum('pic'))


        # c = Flights.objects.filter(tail_number='tailnumber1')
        # print('BEFORE ASDFKAS;DLFKJAS;LDF')
        # print('AFTER AS;DLFKJAS;LDKFJAL;SJ')
        c = Flights.objects.filter(tail_number='tailnumber1')
        # print(c)

        # a = []

        sum = 0

        for i in c:
            print("i asdlfkjasd: ", i.pic)
            sum = sum + i.pic

        # print(sum)
        # print(dir(c))

        # return c.annotate(pic_total=sum)
        # return [{sum}]
