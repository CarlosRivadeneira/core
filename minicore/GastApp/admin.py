from django.contrib import admin
from .models import Expense, Category
from userbudget.models import Budget

# Register your models here.

class GastAppAdmin(admin.ModelAdmin):
    list_display=('amount', 'description', 'owner', 'category', 'date')
    search_fields=('description', 'category', 'date')
    list_per_page=5

admin.site.register(Expense, GastAppAdmin)
admin.site.register(Category)
admin.site.register(Budget)