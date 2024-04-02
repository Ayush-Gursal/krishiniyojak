from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from auth.serializers import UserRegisterSerializer,LoginSerializer,PasswordResetRequestSerializer,SetNewPasswordserializer,LogoutUserSerializer,ProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from auth.models import OneTimeToken
from auth.utils import send_email_verification_mail
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from auth.models import User,Profile


class RegisterUserView(GenericAPIView):

    serializer_class=UserRegisterSerializer

    def post(self,request):
        user_data=request.data
        serializer=self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user=serializer.data
            send_email_verification_mail(user['email'],request)
            return Response({
                'data':user,
                'message':'Success'
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class VerifyUserEmail(GenericAPIView):
    def get(self, request,token):
        try:
            user_token_obj=OneTimeToken.objects.get(email_token=token)
            user=user_token_obj.user
            if not user.is_verified:
                user.is_verified=True
                user.save()
                return Response({
                    'message':'account email verified successfully'
                },status=status.HTTP_200_OK)
            return Response({
                'message':'email already verified'
                },
            status=status.HTTP_204_NO_CONTENT)
        
        except OneTimeToken.DoesNotExist:
            return Response({ 'message':'Token does not exist'},
                status=status.HTTP_404_NOT_FOUND)
        

class LoginUserView(GenericAPIView):
    serializer_class=LoginSerializer
    def post(self,request):
        serializer=self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

class TestAuthentication(GenericAPIView):
      permission_classes=[IsAuthenticated]

      def get(Self,request):
          data={
              'msg':'It works'
          }
          return Response(data,status=status.HTTP_200_OK)
      
      def post(self, request, *args, **kwargs):
        region = request.data.get('region')
        area=request.data.get('area')
        # Retrieve user information from the token
        user = request.user

        # Create profile instance
        profile_data = {'user': user.id, 'region': region,'area':area ,'first_name':user.first_name,'last_name':user.last_name}
        serializer = ProfileSerializer(data=profile_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
      def get(self, request, *args, **kwargs):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        
      def put(self, request, *args, **kwargs):
        user = request.user
        try:
            profile = Profile.objects.get(user=user,first_name=user.first_name,last_name=user.last_name)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        region = request.data.get('region')
        if region is not None:
            profile.region = region
            profile.save()
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Region not provided."}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetRequestView(GenericAPIView):
        serializer_class=PasswordResetRequestSerializer
        def post(self,request):
            serializer=self.serializer_class(data=request.data,context={'request':request})
            serializer.is_valid(raise_exception=True)
            return Response({'Msg':"A link has been sent to your email to reset the Password"},status=status.HTTP_200_OK)


class PasswordResetConfirm(GenericAPIView):
    def get(self,request,uidb64,token):
        try:
            user_id=smart_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({'message':'token is invalid or has expired'},status=status.HTTP_401_UNAUTHORIZED)
            
            return Response({'Sucess':True,'Msg':"Credentilas is valid ",'uid64':uidb64,'token':token},status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError:
           
            return Response({'message':'token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZE)


class SetNewPassword(GenericAPIView):
    serializer_class=SetNewPasswordserializer
    def patch(self,request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'sucess':True,'message':"Password reset Sucessfull"},status=status.HTTP_200_OK)

class LogoutUserView(GenericAPIView):
    serializer_class=LogoutUserSerializer  
    permission_classes=[IsAuthenticated]  
    
    def post(self,request):   
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# from .models import FarmerCrop
# from .serializers import FarmerCropSerializer

# class FarmerCropListCreateAPIView(APIView):
#     def get(self, request, *args, **kwargs):
#         farmer_crops = FarmerCrop.objects.all()
#         serializer = FarmerCropSerializer(farmer_crops, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request, *args, **kwargs):
#         serializer = FarmerCropSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
