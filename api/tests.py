from django.shortcuts import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User

# Create your tests here.


class CreateUserForTestMixin(APITestCase):
    """
    Mixin for add initial users to all subtests 
    """
    def setUp(self):
        """
        Create users with initial data to test database, 
        also add APIClient to self 
        """
        self.client = APIClient()
        self.super_user = User.objects.create(
            username="superuser",
            password="password123",
            email="supermail@mail.com",
            is_staff=True,
            first_name="Super",
            last_name="User"
        )
        self.common_user = User.objects.create(
            username="commonuser",
            password="password123",
            email="commonmail@mail.com",
            first_name="Common",
            last_name="User"
        )


class UserTest(CreateUserForTestMixin):
    def test_create_user(self):
        """
            Ensure we can create new user object        
        """
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(User.objects.filter(is_staff=True).count(), 1)
        self.assertEqual(
            User.objects.get(is_staff=False).username, "commonuser")
