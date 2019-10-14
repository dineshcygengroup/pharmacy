from rest_framework import serializers
from .models import *
from drf_tweaks.serializers import ModelSerializer
from rest_framework.fields import CharField
from appointments.models import Appointmentrequest
from usermanagement.models import Patient
from patientmanagement.models import Medications


class CustomerTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerType
        fields = ('id', 'customerType')

class OrderSerializer(serializers.ModelSerializer):
    supplier = serializers.SlugRelatedField(queryset=Supplier.objects.all(), slug_field='name')

    medicine = serializers.SlugRelatedField(queryset=Medicine.objects.all(), slug_field='name')
    medicineCategory = serializers.SlugRelatedField(queryset=MedicineCategory.objects.all(), slug_field='medicineType')
    # medicine = djangoserial.serialize('json', Medicine.objects.all(), fields=('name',))
    # print(medicine)

    class Meta:
        model = PurchaseOrder
        fields = ("id", "medicine", "supplier", "quantity", "medicineCategory", "orderStatus", "details", "fulfillmentDate")


class OrderDetailsSerializer(serializers.ModelSerializer):
    """
    Gives details about the order
    """
    supplier = serializers.SlugRelatedField(queryset=Supplier.objects.all(), slug_field='name')
    medicine = serializers.SlugRelatedField(queryset=Medicine.objects.all(), slug_field='name')
    paymentType = serializers.SlugRelatedField(queryset=PaymentOption.objects.all(), slug_field='paymentType')
    purchaseTax = serializers.SlugRelatedField(queryset=PurchaseTaxOption.objects.all(), slug_field='purchaseTax')
    medicineCategory = serializers.SlugRelatedField(queryset=MedicineCategory.objects.all(), slug_field='medicineType')

    class Meta:
        model = PurchaseOrder
        fields = ("id", "medicine", "supplier", "quantity", "fulfillmentDate", "medicineCategory", "batchNumber",
                  "expiryDate", "paymentType", "purchaseTax", "costPrice", "maxRetailPrice", "orderStatus",
                  "details")


class PaymentOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentOption
        fields = ("id", "paymentType")


class PurchaseTaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseTaxOption
        fields = ("id", "purchaseTax")

class MedicineSerializer(serializers.ModelSerializer):
    supplier = serializers.SlugRelatedField(queryset=Supplier.objects.all(), slug_field='name')
    location = serializers.SlugRelatedField(queryset=MedicineStoreLocation.objects.all(), slug_field='storeLocation')
    category = serializers.SlugRelatedField(queryset=MedicineCategory.objects.all(), slug_field='medicineType')

    class Meta:
        model = Medicine
        fields = ("id", "name", "genericName", "category", "quantity", "location", "supplier", "expiryDate",
                  "batchNumber", "medicineDetails", "price", "referenceLink")


class StoreLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineStoreLocation
        fields = ("id", "storeLocation", "medicineCategory")


class MedicineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineCategory
        fields = ("id", "medicineType")


class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = ('id', 'name', 'phoneNumber', 'contactPerson', 'address', 'email', 'landlineNumber', 'altPhoneNumber')



#sales serializer 7aug



class MedicineListSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(queryset=MedicineCategory.objects.all(), slug_field='medicineType')
    medicineName = serializers.SlugRelatedField(queryset=Medicine.objects.all(), slug_field='name')

    class Meta:
        model = MedicineSalesList
        fields = ("id", "medicineName", "medicinelist", "category", "quantity", "sellingPrice")


class MedicineSalesSerializer(serializers.ModelSerializer):
    medicine_list = MedicineListSerializer(many=True)
    customer = serializers.SlugRelatedField(queryset=CustomerType.objects.all(), slug_field='customerType')
    paymentOption = serializers.SlugRelatedField(queryset=PaymentOption.objects.all(), slug_field='paymentType')

    class Meta:
        model = MedicineSale
        fields = ('medicine_list', 'id', 'customer', 'patientName', 'referredDoctorName', 'paymentOption',
                  'stockAvailable', 'saleStatus', 'total')

    def create(self, validated_data):
        medicines_data = validated_data.pop('medicine_list')
        sale = MedicineSale.objects.create(**validated_data)
        for medicine in medicines_data:
            MedicineSalesList.objects.create(medicinelist=sale, **medicine)
        return sale


# fdaad serializer 7aug

class JSONField(CharField):
    type_name = "JSONField"

    def to_internal_value(self, data):
        return data

    def to_representation(self, value):
        return value


class MedicationNameSerializer(ModelSerializer):
    active_substances = JSONField(read_only=True)

    class Meta:
        model = MedicationName
        fields = ["name", "active_substances"]


class MedicationStrengthSerializer(ModelSerializer):
    active_substances = JSONField(read_only=True)
    strength = JSONField(read_only=True)

    class Meta:
        model = MedicationStrength
        fields = ["name", "active_substances", "strength"]


class MedicationNDCSerializer(ModelSerializer):
    active_substances = JSONField(read_only=True)
    strength = JSONField(read_only=True)

    class Meta:
        model = MedicationNDC
        fields = ["name", "active_substances", "strength", "manufacturer", "ndc"]

# in patient

class Multipleappointmentserializer(ModelSerializer):
    appointmentId = serializers.CharField(source='id')
    appointmentDate = serializers.SerializerMethodField()
    def get_appointmentDate(self,obj):
        return '{} {}'.format(obj.bookingdate, obj.bookingtime)

    class Meta:
        model = Appointmentrequest
        fields = ("appointmentId",'appointmentDate')
class Patientappointmentserializer(ModelSerializer):
    appointments = Multipleappointmentserializer(many=True)

    class Meta:
        model = Patient
        fields = ("UHID", "appointments")


class PatientMedicationsserializer(ModelSerializer):
    appointmentId = serializers.CharField(source='appointment')
    class Meta:
        model = Medications
        fields = ['appointmentId', 'medicinname', 'quantity','doesage']

class GetMedicationsserializer(ModelSerializer):
    medications = PatientMedicationsserializer(many=True)
    appointmentId = serializers.CharField(source='id')
    doctor = serializers.SerializerMethodField()
    def get_doctor(self, obj):
        print(obj.doctor.pro.first_name)
        return '{} {} {}'.format(obj.doctor.pro.first_name, obj.doctor.pro.middle_name,obj.doctor.pro.last_name)
    class Meta:
        model = Appointmentrequest
        fields = ['appointmentId','medications', 'doctor']

