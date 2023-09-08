from rest_framework import permissions

class isAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if(hasattr(request.user, 'role')):
            return request.user.role == 1
        return 0

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
  