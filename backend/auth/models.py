from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.utils.translation import gettext_lazy as _
from auth.manager import UserManager
from rest_framework_simplejwt.tokens import RefreshToken

AUTH_PROVIDERS={'email':'email','google':'google'}

class User(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField(max_length=255,unique=True,verbose_name=_("Email Address"))
    first_name=models.CharField(max_length=100,verbose_name=_("First Name"))
    last_name=models.CharField(max_length=100,verbose_name=_("Last Name"))
    
    is_superuser=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_verified=models.BooleanField(default=False)
    date_joined=models.DateField(auto_now_add=True)
    is_active=models.BooleanField(default=True)
    last_login=models.DateTimeField(auto_now=True)
    auth_provider=models.CharField(max_length=50,null=False,default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["first_name","last_name"]  

    objects=UserManager()    #for custom user model not superuser     

    def tokens(self):
         refresh = RefreshToken.for_user(self)
         return {
           'refresh':str(refresh),
           'access':str(refresh.access_token),
         }


    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return f"{self.first_name.title()}{self.last_name.title()}"
    

    
class OneTimeToken(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    email_token=models.CharField(max_length=200)


    def __str__(self):
       return f"{self.user.first_name} - token"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    region = models.CharField(max_length=100)
    area = models.CharField(max_length=100,default="0")
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
   
    def _str_(self):
        return self.user.username
    

# class FarmerCrop(models.Model):
#     TONS = 'Tons'
#     QUINTAL = 'Quintal'
#     YIELD_CHOICES = [
#         (TONS, 'Tons'),
#         (QUINTAL, 'Quintal'),
#     ]
    
#     farmer_name = models.CharField(max_length=100)
#     crop_grown = models.CharField(max_length=100)
#     total_yield = models.DecimalField(max_digits=10, decimal_places=2)
#     yield_choice = models.CharField(max_length=10, choices=YIELD_CHOICES, default=TONS)
#     contact_no = models.CharField(max_length=15)  # Adjust max length as needed

#     def _str_(self):
#         return f'{self.farmer_name} - {self.crop_grown}'    