from django.db import models


class Department(models.Model):
    departmentName = models.CharField(max_length=255, unique=True)
    contactName = models.CharField(max_length=255)
    phoneNumber = models.BigIntegerField()

    def __str__(self):
        return "{}".format(self.departmentName)


class Product(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    category = models.ForeignKey('inventory.ProductCategory', on_delete=models.SET_NULL,
                                 related_name='category', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    #TBD: location needs to be added

    class Meta:
        unique_together = ('name', 'category',)

    def __str__(self):
        return "{}".format(self.name)

class ProductCategory(models.Model):
    productCategory = models.CharField(max_length=255)

    def __str__(self):
        return "{}".format(self.productCategory)

class PurchaseOrder(models.Model):
    # vendorName = models.ForeignKey('vendor.Vendor', on_delete=models.SET_NULL,
    #                                related_name='vendorName', null=True, blank=True)
    # productName = models.ForeignKey('product.Product', on_delete=models.SET_NULL,
    #                                 related_name='prodName', null=True, blank=True)
    orderDate = models.DateTimeField(null=True)
    requestedDate = models.DateTimeField(null=True)
    requestedDepartment = models.CharField(max_length=255, null=True, blank=True)
    remarks = models.TextField(null=True, blank=True)
    # Constants in Model class
    CREATED = 'CREATED'
    APPROVED = 'APPROVED'
    DELIVERED = 'DELIVERED'
    CANCELLED = 'CANCELLED'

    PURCHASE_STATUS = (
        (CREATED, 'Created'),
        (APPROVED, 'Approved'),
        (DELIVERED, 'Delivered'),
        (CANCELLED, 'Cancelled'),
    )
    purchaseStatus = models.CharField(max_length=10, choices=PURCHASE_STATUS, default=CREATED, null=True, blank=True)

    def __str__(self):
        return "{}".format(self.orderDate)

class Productlist(models.Model):
    productID = models.ForeignKey('inventory.Product', on_delete=models.SET_NULL,related_name='product', null=True, blank=True)
    vendorID = models.ForeignKey('inventory.Vendor', on_delete=models.SET_NULL, related_name='vendor', null=True, blank=True)
    purchaseorderid = models.ForeignKey(PurchaseOrder, null=True, on_delete=models.CASCADE, related_name='product_list')
    quantity = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return "{}".format(self.purchaseorderid)


class Vendor(models.Model):
    name = models.CharField(max_length=255, unique=True)
    phoneNumber = models.BigIntegerField()
    contactName = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    email = models.EmailField()
    website = models.CharField(max_length=255, blank=False, null=True)
    remarks = models.TextField(blank=False, null=True)

    def __str__(self):
        return "{}".format(self.name)
