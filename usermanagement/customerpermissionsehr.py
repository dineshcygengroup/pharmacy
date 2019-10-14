from rest_framework.permissions import BasePermission
from usermanagement.models import Profile

def customusertype(request):
    u = request.user
    pro = Profile.objects.get(user=u)
    userType = pro.user_type_id
    print( userType)
    return userType



class Isauthorizedonpatientsdata(BasePermission):

    """
    Allows access only to admin and doctors users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (str(request.user.user_type) == 'Doctor' or str(request.user.user_type)=="Admin")




class Isauthorizedtocreateuser(BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and str(request.user.user_type_id)==7

class Isadminpage(BasePermission):

    def has_permission(self, request, view):

        return bool(request.user and request.user.is_authenticated and customusertype(request) == 3)

class Isreceptionist(BasePermission):

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and customusertype(request) == 2)
class Isdoctor(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and customusertype(request) == 6)

class Isnurse(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and customusertype(request) == 5)

class Islaboratorist(BasePermission):
    def has_permission(self,request, view):
        return bool(request.user and request.user.is_authenticated and customusertype(request) == 1)

class Ispharma(BasePermission):
    def has_permission(self,request, view):
        return bool(request.user and request.user.is_authenticated and customusertype(request) == 4)

