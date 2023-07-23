from django.urls import path
from .views import ItemView, SectionView, ImageView

urlpatterns = [
    path('items', ItemView.as_view({'get': 'list'})),
    path('section/<int:id>', SectionView.as_view({'get': 'retrieve'})),
    path('get-section-type/<int:id>', SectionView.as_view({'get': 'retrieve_type'})),
    path('get-image/<int:id>', ImageView.as_view({'get': 'retrieve'})),
]