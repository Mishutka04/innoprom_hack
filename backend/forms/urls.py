from django.urls import path
from forms import views

app_name = 'forms'


urlpatterns = [
     path('form/<int:pk>/', views.QuotationSessionAPIView.as_view(), name='get_session'),
]