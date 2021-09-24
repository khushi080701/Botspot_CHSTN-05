
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class LoginForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder": "Username",
                "class": "form-control"
            }
        ))

    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "Password",
                "class": "form-control"
            }
        ))


class SignUpForm(UserCreationForm):
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder": "Username",
                "class": "form-control"
            }
        ))
    email = forms.EmailField(
        widget=forms.EmailInput(
            attrs={
                "placeholder": "Email",
                "class": "form-control"
            }
        ))
    full_name = forms.CharField(label='Full name', max_length=100)
   # phone_number = forms.RegexField(regex=r'^\+?1?\d{9,15}$', error_message=(

    #    "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."))
    birth_date = forms.DateField(help_text='Required. Format: YYYY-MM-DD')
    organization = forms.CharField(label='', max_length=100)

    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "Password",
                "class": "form-control"
            }
        ))
    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "Password check",
                "class": "form-control"
            }
        ))

    OP_1 = 'Bright Spark Education Program'
    OP_2 = 'Transformers (Livelihood)'
    OP_3 = 'Feeding Program (Zero Hunger)'
    OP_4 = 'Women of Courage (Gender)'
    OP_5 = ''
    OP_6 = 'Blood Donor'
    OP_CHOICES = (
        (OP_1, u"Bright Spark Education Program"),
        (OP_2, u"Transformers (Livelihood)"),
        (OP_3, u"Feeding Program (Zero Hunger)"),
        (OP_4, u"Women of Courage (Gender)"),
        (OP_5, u"Youngistaan Animal Heroes"),


    )
    category = forms.ChoiceField(choices=OP_CHOICES)

    class Meta:
        model = User
        fields = ('username', 'email', 'full_name', 'birth_date',
                  'organization',  'password1', 'password2', 'category')
