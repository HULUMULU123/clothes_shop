from django.contrib import admin
from django.urls import path

from shop_api import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", views.products_list, name="products_list"),
    path("api/products/<slug:slug>/", views.product_detail, name="product_detail"),
    path("api/cart/", views.cart_summary, name="cart_summary"),
    path("api/favorites/", views.favorites_summary, name="favorites_summary"),
    path("api/orders/", views.orders_history, name="orders_history"),
    path("api/profile/", views.profile_summary, name="profile_summary"),
]
