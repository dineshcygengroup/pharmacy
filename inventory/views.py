from .models import *
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from utils.parse_utils import extract_values
import datetime
from django.http import HttpResponse

@api_view(['GET', 'POST'])
def department_list(request):
    """
    List all vendors, or create a new vendor.
    """

    if request.method == 'GET':
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def department_detail(request, pk):
    """
    :param request: request type
    :param pk: primary key
    :return: get/update/delete vendor by unique ID
    """
    try:
        department = Department.objects.get(pk=pk)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DepartmentSerializer(department)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = DepartmentSerializer(department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def product_list(request):
    """
    List all products, or create a new product.
    """
    if request.method == 'GET':
        medicines = Product.objects.all()
        serializer = ProductSerializer(medicines, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    """
    :param request: API Request
    :param pk: primary key or id
    :return: response code from rest end point
    """
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def product_category_list(request):
    """
    List all code store locations, or create a new store location.
    """
    if request.method == 'GET':
        category = ProductCategory.objects.all()
        serializer = ProductCategorySerializer(category, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def purchase_order_list(request):
    """
    List all vendors, or create a new vendor.
    """

    if request.method == 'GET':
        purchase_orders = PurchaseOrder.objects.all()
        serializer = PurchaseOrderSerializer(purchase_orders, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PurchaseOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            #product update
            for i in request.data['product_list']:
                product_id = extract_values(i,'productID')
                product_quantities = extract_values(i, 'quantity')
                for prod, qty in zip(product_id, product_quantities):
                    product = Product.objects.all().filter(id=prod).values('quantity')
                    for product_stock in product:
                        prodq = int(qty)
                        stock_update = product_stock['quantity'] - prodq
                        Product.objects.all().filter(id=prod).update(quantity=stock_update)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def purchase_order_detail(request, pk):
    """
    :param request: request type
    :param pk: primary key
    :return: get/update/delete vendor by unique ID
    """
    try:
        order = PurchaseOrder.objects.get(pk=pk)
    except PurchaseOrder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PurchaseOrderSerializer(order)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PurchaseOrderSerializer(order, data=request.data)
        if serializer.is_valid():
            PurchaseOrder.objects.all().filter(pk=pk).update(purchaseStatus=request.data['purchaseStatus'])
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def purchase_order_date_range(request):

    if request.method == 'GET':
        tart_dt = datetime.datetime(2019, 8, 1)
        end_dt = datetime.datetime(2019, 8, 11)
        return HttpResponse(PurchaseOrder.objects.all().filter(orderDate__range=(tart_dt, end_dt)),
                            content_type="application/json")



@api_view(['GET', 'POST'])
def vendor_list(request):
    """
    List all vendors, or create a new vendor.
    """

    if request.method == 'GET':
        vendors = Vendor.objects.all()
        serializer = VendorSerializer(vendors, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = VendorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def vendor_detail(request, pk):
    """
    :param request: request type
    :param pk: primary key
    :return: get/update/delete vendor by unique ID
    """
    try:
        vendor = Vendor.objects.get(pk=pk)
    except Vendor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VendorSerializer(vendor)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = VendorSerializer(vendor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        vendor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def countview(request):
    if request.method == 'GET':
        vendorcount = Vendor.objects.all().count()
        active = PurchaseOrder.objects.filter(purchaseStatus="CREATED").count()
        purchase = PurchaseOrder.objects.all().count()
        context = {"vendorcount":vendorcount,"active":active,"purchase":purchase}
        return Response(context)




