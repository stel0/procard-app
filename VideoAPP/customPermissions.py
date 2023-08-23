from rest_framework import permissions

class isAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser

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
  