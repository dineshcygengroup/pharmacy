# -*- coding: utf-8 -*-
from django.db import models
from django_extensions.db.fields.json import JSONField

class CustomerType(models.Model):
    customerType = models.CharField(max_length=255)

    def __str__(self):
        return "{}".format(self.customerType)

class MedicineCategory(models.Model):
    medicineType = models.CharField(max_length=255)

    def __str__(self):
        return "{}".format(self.medicineType)


class MedicineStoreLocation(models.Model):
    medicineCategory = models.CharField(max_length=255)
    storeLocation = models.CharField(max_length=255)

    def __str__(self):
        return "{}".format(self.storeLocation)


class Supplier(models.Model):
    name = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=20)
    altPhoneNumber = models.CharField(max_length=20)
    landlineNumber = models.CharField(max_length=20)
    contactPerson = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    email = models.EmailField()

    def __str__(self):
        return "{}".format(self.name)



class Medicine(models.Model):
    batchNumber = models.CharField(max_length=255, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    category = models.ForeignKey('pharmacy.MedicineCategory', on_delete=models.SET_NULL, related_name='category', null=True, blank=True)
    expiryDate = models.DateTimeField(null=True)
    genericName = models.CharField(max_length=255)
    location = models.ForeignKey('pharmacy.MedicineStoreLocation', on_delete=models.SET_NULL, related_name='StoreLocation', null=True, blank=True)
    medicineDetails = models.TextField()
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    referenceLink = models.CharField(max_length=255)
    supplier = models.ForeignKey(Supplier, related_name='assignedSupplier', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        unique_together = ('name', 'category',)

    def __str__(self):
        return "{}".format(self.name)









class PurchaseOrder(models.Model):
    medicine = models.ForeignKey(Medicine, on_delete=models.SET_NULL, related_name='medicine', null=True, blank=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, related_name='supplier', null=True, blank=True)
    quantity = models.PositiveIntegerField()
    medicineCategory = models.ForeignKey('pharmacy.MedicineCategory', on_delete=models.SET_NULL,
                                         related_name='medcategory', null=True, blank=True)
    fulfillmentDate = models.DateTimeField(null=True)
    batchNumber = models.CharField(max_length=255, null=True, blank=True)
    expiryDate = models.DateTimeField(null=True, blank=True)
    costPrice = models.PositiveIntegerField(null=True, blank=True)
    maxRetailPrice = models.PositiveIntegerField(null=True, blank=True)
    paymentType = models.ForeignKey('pharmacy.PaymentOption', on_delete=models.SET_NULL, related_name='payment',
                                    null=True, blank=True)
    purchaseTax = models.ForeignKey('pharmacy.PurchaseTaxOption', on_delete=models.SET_NULL, related_name='tax',
                                    null=True, blank=True)
    # Constants in Model class
    RECEIVED = 'RECEIVED'
    RETURNED = 'RETURNED'
    CANCELLED = 'CANCELLED'
    ORDERED = 'ORDERED'

    ORDER_STATUS = (
        (RECEIVED, 'Received'),
        (RETURNED, 'Returned'),
        (CANCELLED, 'Cancelled'),
        (ORDERED, 'Ordered'),
    )
    orderStatus = models.CharField(max_length=10, choices=ORDER_STATUS, default=ORDERED)
    details = models.TextField(null=True, blank=True)

    def __str__(self):
        return "{} - {}".format(self.medicine, self.supplier)


class PaymentOption(models.Model):
    paymentType = models.CharField(max_length=255)

    def __str__(self):
        return "{}".format(self.paymentType)


class PurchaseTaxOption(models.Model):
    purchaseTax = models.PositiveIntegerField()

    def __str__(self):
        return "{}".format(self.purchaseTax)



#sales models 7aug

class MedicineSale(models.Model):
    customer = models.ForeignKey(CustomerType, on_delete=models.SET_NULL, null=True, related_name='customer')
    patientName = models.CharField(max_length=255)
    referredDoctorName = models.CharField(max_length=255)
    category = models.ForeignKey('pharmacy.MedicineCategory', on_delete=models.SET_NULL,
                                 related_name='medicinescategory', null=True, blank=True)
    paymentOption = models.ForeignKey('pharmacy.PaymentOption', on_delete=models.SET_NULL, related_name='paymentOption',
                                    null=True, blank=True)
    stockAvailable = models.PositiveIntegerField(null=True, blank=True)
    # Constants in Model class
    PAID = 'PAID'
    NOTPAID = 'NOTPAID'
    CANCELLED = 'CANCELLED'

    SALE_STATUS = (
        (PAID, 'Paid'),
        (NOTPAID, 'Notpaid'),
        (CANCELLED, 'Cancelled'),
    )
    saleStatus = models.CharField(max_length=10, choices=SALE_STATUS, default=NOTPAID, null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    def __str__(self):
        return "{}".format(self.patientName)

class MedicineSalesList(models.Model):
    medicineName = models.ForeignKey('pharmacy.Medicine', on_delete=models.SET_NULL, related_name='medname', null=True, blank=True)
    category = models.ForeignKey('pharmacy.MedicineCategory', on_delete=models.SET_NULL, related_name='medicinecategory',
                                 null=True, blank=True)
    medicinelist = models.ForeignKey(MedicineSale, null=True, on_delete=models.CASCADE, related_name='medicine_list')
    sellingPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    quantity = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return "{}".format(self.medicinelist)


#fdaad models

class MedicationName(models.Model):
    name = models.CharField(primary_key=True, max_length=255, help_text="Commercial Name (e.g. Viagra)")
    active_substances = JSONField(default=[], blank=True, help_text="List of active substances")

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name

    @property
    def active_substances_list(self):
        if not isinstance(self.active_substances, list):
            return ""

        return ", ".join(self.active_substances)


class MedicationStrength(models.Model):
    #STRENGTH_HELP_TEXT = """For example:
    #{
    #    �Sildenafil�: { �strength�: 3, �unit�: �mg/1� }
    #}
    #"""
    medication_name = models.ForeignKey("MedicationName", on_delete=models.CASCADE, related_name="strengths")
    strength = JSONField(default={}, blank=True)

    @property
    def name(self):
        return self.medication_name.name

    @property
    def active_substances(self):
        return self.medication_name.active_substances


class MedicationNDC(models.Model):
    medication_strength = models.ForeignKey("MedicationStrength", on_delete=models.CASCADE, related_name="ndcs")
    ndc = models.CharField(max_length=12, unique=True, db_index=True)
    manufacturer = models.CharField(max_length=255, db_index=True)

    def __str__(self):
        return self.ndc

    @property
    def name(self):
        return self.medication_strength.medication_name.name

    @property
    def active_substances(self):
        return self.medication_strength.medication_name.active_substances

    @property
    def strength(self):
        return self.medication_strength.strength

class AddMedicineFromDB(models.Model):
    name = models.ForeignKey(MedicationName, on_delete=models.SET_NULL, related_name='medname', null=True, blank=True)
    category = models.ForeignKey('pharmacy.MedicineCategory', on_delete=models.SET_NULL, related_name='medcategorys',
                                 null=True, blank=True)
    location = models.ForeignKey('pharmacy.MedicineStoreLocation', on_delete=models.SET_NULL,
                                 related_name='StoreLocations', null=True, blank=True)
    supplier = models.ForeignKey(Supplier, related_name='assignedSuppliers', on_delete=models.SET_NULL, null=True,
                                 blank=True)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    expiryDate = models.DateTimeField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return "{}".format(self.name)



