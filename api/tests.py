from django.shortcuts import reverse
from django.contrib.auth.models import User
from django.core.management import call_command

from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from api.models import Subject

# Create your tests here.


class CreateUserForTestMixin(APITestCase):
    """
    Mixin for add initial users to all subtests 
    """
    fixtures = ['subjects.json', ]

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
        self.super_user.subject.add(Subject.objects.get(name='Python'))

        self.common_user = User.objects.create(
            username="commonuser",
            password="password123",
            email="commonmail@mail.com",
            first_name="Common",
            last_name="User"
        )
        self.common_user.subject.add(Subject.objects.get(name='History'))
        # load comments for users
        call_command('loaddata', 'comments.json')


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

    def test_subjects_list(self):
        """
        Test for get access to display subjects and create new, if authorised
        """
        url = reverse('subject-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)  # check count of fixtures

        # try to add new subject by anonymous user
        response = self.client.post(url, data={'name': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # try to add new subject by common user
        self.client.force_login(user=self.common_user)
        response = self.client.post(url, data={'name': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # try to update new subject by common user
        detail_url = reverse('subject-detail',
                             kwargs={'pk': Subject.objects.last().pk})
        response = self.client.put(detail_url, data={'name': 'new name'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # try to delete new subject by common user
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_comments_list(self):
        """
        Test for get all comments if user is anonymous 
        or with same subject as subject in user
        """
        url = reverse('comment-list')
        response = self.client.get(url)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get comments with subject the same as user subject
        self.client.force_authenticate(user=self.super_user)
        response = self.client.get(url)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['subject'],
                         self.super_user.subject.first().name)
        self.client.logout()
        # get comments with another subject as same as common_user subject
        self.client.force_login(user=self.common_user)
        response = self.client.get(url)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['subject'],
                         self.common_user.subject.first().name)

        # try to update comment by common user
        detail_url = response.data[0]['url']
        response = self.client.patch(detail_url,
                                     data={'text': 'Updated comment'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # try to delete comment by common user
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
