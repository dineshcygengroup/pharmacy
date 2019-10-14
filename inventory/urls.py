from .views import *
from django.conf.urls import url

urlpatterns = [
    url(r'^api/departments/$', department_list),
    url(r'^api/department/(?P<pk>[0-9]+)/$', department_detail),
    url(r'^api/products/', product_list),
    url(r'^api/product/(?P<pk>[0-9]+)/$', product_detail),
    url(r'^api/productcategory/', product_category_list),
    url(r'^api/purchaseOrders/', purchase_order_list),
    url(r'^api/purchaseOrder/(?P<pk>[0-9]+)/$', purchase_order_detail),
    url(r'^api/purchaseOrdersDateRange/', purchase_order_date_range),
    url(r'^api/vendors/$', vendor_list),
    url(r'^api/vendor/(?P<pk>[0-9]+)/$', vendor_detail),
    url(r'^api/dashboard/$', countview)
]
