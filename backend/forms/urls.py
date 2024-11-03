from django.urls import path
from forms import views

app_name = 'forms'


urlpatterns = [
     path('users/', views.UserProfileListCreateView.as_view(), name='get_session'),
     path('user/card/<int:pk>/', views.CombinedUserProfileMethodologyView.as_view(), name='get_session'),
     path('generate/metric/', views.EvaluateReviewsView.as_view(), name='get_session'),
     path('methodology/<int:pk>/', views.MethodologyListCreateView.as_view(), name='get_session'),
     path('methodology/', views.MethodologyListCreateView.as_view(), name='get_session'),
     path('user/<int:pk>/', views.UserProfileListCreateView.as_view(), name='get_session'),
     
     
     
     
     
     
     
]