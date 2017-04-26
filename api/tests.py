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
    """
    Test for users
    """
    def test_create_user(self):
        """
            Ensure we can create new user object        
        """
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(User.objects.filter(is_staff=True).count(), 1)
        self.assertEqual(
            User.objects.get(is_staff=False).username, "commonuser")
        url = reverse('user-list')
        response = self.client.get(url)
        response_data = response.data
        self.assertEqual(len(response_data), 2)


class PermissionTest(CreateUserForTestMixin):
    """
    Test for check permission of users to any pages of API
    """
    def test_users_list(self):
        """
        Ensure we can't add or edit any data by anonymous user
        """
        list_url = reverse('user-list')
        detail_url = reverse('user-detail', kwargs={'pk': 1})

        # check get all user list
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check get first user
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check try to add new user by anonymous user
        response = self.client.post(list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # check try to update user by anonymous user
        response = self.client.put(detail_url,
                                   data={'username': 'not-superuser'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
