from rest_framework import permissions
from .serializer import UserSerializer

class isAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if(hasattr(request.user, 'role')):
            print("User role")
            print(request.user.role)
            return request.user.role == 1
        return False
class isBannedUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_banned

class isResetPasswordUser(permissions.BasePermission):
    """Verifica que el usuario tenga el permiso para cambiar la contraseña"""
    """
        Example
        User:
            'reset_password' : True
    """
    def has_permission(self, request, view):
        return request.user.reset_password
  