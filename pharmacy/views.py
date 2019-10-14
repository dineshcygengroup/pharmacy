from .models import *
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from utils.parse_utils import extract_values
from django.conf import settings
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework.permissions import AllowAny
from pharmacy.es_search import EsSearchAPI
from usermanagement.models import Patient
from appointments.models import Appointmentrequest
from patientmanagement.models import Medications

@api_view(['GET', 'POST'])
def customer_list(request):
    """
    List all code customers, or create a new customer.
    """

    if request.method == 'GET':
        customers = CustomerType.objects.all()
        serializer = CustomerTypeSerializer(customers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CustomerTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def customer_detail(request, pk):
    try:
        customer = CustomerType.objects.get(pk=pk)
    except CustomerType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomerTypeSerializer(sale)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CustomerTypeSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def order_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        suppliers = PurchaseOrder.objects.all()
        serializer = OrderSerializer(suppliers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def order_details(request, pk):
    """
    :param request: API Request
    :param pk: primary key or id
    :return: response code from rest end point
    """
    try:
        order = PurchaseOrder.objects.get(pk=pk)
    except PurchaseOrder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OrderDetailsSerializer(order)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = OrderDetailsSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()

            if order.orderStatus == PurchaseOrder.RECEIVED:
                medicine = Medicine.objects.all().filter(name=order.medicine).values('quantity')
                for medicine_stock in medicine:
                    Medicine.objects.all().filter(name=order.medicine).update(
                        quantity=medicine_stock['quantity'] + order.quantity)

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def tax_option_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        tax_options = PurchaseTaxOption.objects.all()
        serializer = PurchaseTaxSerializer(tax_options, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PurchaseTaxSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def payment_option_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        payment_options = PaymentOption.objects.all()
        serializer = PaymentOptionSerializer(payment_options, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PaymentOptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def medicine_list(request):
    """
    List all code medicines, or create a new medicine.
    """
    if request.method == 'GET':
        medicines = Medicine.objects.all()
        serializer = MedicineSerializer(medicines, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MedicineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def medicine_detail(request, pk):
    """
    :param request: API Request
    :param pk: primary key or id
    :return: response code from rest end point
    """
    try:
        medicine = Medicine.objects.get(pk=pk)
    except Medicine.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MedicineSerializer(medicine)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MedicineSerializer(medicine, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        medicine.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def store_location_list(request):
    """
    List all code store locations, or create a new store location.
    """
    if request.method == 'GET':
        locations = MedicineStoreLocation.objects.all()
        serializer = StoreLocationSerializer(locations, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StoreLocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def medicine_category_list(request):
    """
    List all code store locations, or create a new store location.
    """
    if request.method == 'GET':
        category = MedicineCategory.objects.all()
        serializer = MedicineCategorySerializer(category, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MedicineCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def supplier_home(request):
    return render(request, 'supplier/home.html')


@api_view(['GET', 'POST'])
def supplier_list(request):
    """
    List all code suppliers, or create a new supplier.
    """

    if request.method == 'GET':
        suppliers = Supplier.objects.all()
        serializer = SupplierSerializer(suppliers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SupplierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def supplier_detail(request, pk):
    try:
        supplier = Supplier.objects.get(pk=pk)
        print( supplier)
    except Supplier.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SupplierSerializer(supplier)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SupplierSerializer(supplier, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#sales 7aug

@api_view(['GET', 'POST'])
def sale_list(request):
    """
    List all code suppliers, or create a new supplier.
    """

    if request.method == 'GET':
        medicine_sale = MedicineSale.objects.all()
        serializer = MedicineSalesSerializer(medicine_sale, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MedicineSalesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # update medicine quantity
            medicine_names = extract_values(request.data, 'medicineName')
            medicine_quantities = extract_values(request.data, 'quantity')
            for med, qty in zip(medicine_names, medicine_quantities):
                medicine = Medicine.objects.all().filter(name=med).values('quantity')
                for medicine_stock in medicine:
                    stock_update = medicine_stock['quantity'] - qty
                    Medicine.objects.all().filter(name=med).update(quantity=stock_update)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def sale_detail(request, pk):
    try:
        sale = MedicineSale.objects.get(pk=pk)
    except MedicineSale.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MedicineSalesSerializer(sale)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MedicineSalesSerializer(sale, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        sale.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#fdaad views


AUTOCOMPLETE_LIMIT = getattr(settings, "FDADB_AUTOCOMPLETE_LIMIT", 10)


class SearchMixin(object):
    def get_q_and_es_enabled(self):
        es_enabled = bool(getattr(settings, "ELASTICSEARCH_URL", None) and not getattr(settings, "TESTING", False))
        q = None
        if hasattr(self, "request"):
            if "q" in self.request.GET:
                q = self.request.GET["q"]
        return q, es_enabled


class MedicationNamesListAPI(ListAPIView, SearchMixin):
    permission_classes = (AllowAny,)
    # for now list of autocomplete results will be limited, so no pagination is needed
    # TODO: add ES pagination
    pagination_class = LimitOffsetPagination
    queryset = MedicationName.objects.all()
    serializer_class = MedicationNameSerializer
    ordering = ("name",)

    def get_queryset(self):
        q, es_enabled = self.get_q_and_es_enabled()
        if es_enabled:
            count, objects_list = EsSearchAPI().search_name(q, AUTOCOMPLETE_LIMIT)
            return objects_list
        else:
            queryset = super().get_queryset()
            if q:
                queryset = queryset.filter(name__icontains=q)[:AUTOCOMPLETE_LIMIT]
            return queryset


class MedicationStrengthsListAPI(ListAPIView, SearchMixin):
    # TODO: add filtering and use ES for the queryset (with pagination)
    permission_classes = (AllowAny,)
    pagination_class = PageNumberPagination
    queryset = MedicationStrength.objects.all()
    serializer_class = MedicationStrengthSerializer
    ordering = ("id",)

    def get_queryset(self):
        q, es_enabled = self.get_q_and_es_enabled()
        queryset = super().get_queryset().filter(medication_name__name=self.kwargs["medication_name"])
        if q:
            queryset = queryset.filter(strength__icontains=q)
        return queryset


class MedicationNDCsListAPI(ListAPIView, SearchMixin):
    # TODO: add filtering and use ES for the queryset (with pagination)
    permission_classes = (AllowAny,)
    pagination_class = PageNumberPagination
    queryset = MedicationNDC.objects.all()
    serializer_class = MedicationNDCSerializer
    ordering = ("id",)

    def get_queryset(self):
        q, es_enabled = self.get_q_and_es_enabled()
        queryset = super().get_queryset()
        queryset = queryset.filter(
            medication_strength__medication_name__name=self.kwargs["medication_name"],
            medication_strength_id=self.kwargs["strength_id"],
        )

        if q:
            queryset = queryset.filter(manufacturer__icontains=q)
        return queryset

# in patient
class get_patient_appointment(ListAPIView):
    serializer_class = Patientappointmentserializer
    queryset = Patient.objects.all()


class PatientMedicationsview(ListAPIView):
    serializer_class = GetMedicationsserializer
    queryset = Appointmentrequest.objects.all()