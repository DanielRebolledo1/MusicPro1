from social_core.exceptions import AuthMissingParameter, AuthAlreadyAssociated
from .models import Usuario


class EmailAlreadyAssociated(AuthAlreadyAssociated):
    pass


def ensure_valid(strategy, backend, user, new_association, details, **kwargs, ):
    if new_association:
        if "email" not in details:
            raise AuthMissingParameter(backend, "email")
        same = Usuario.objects.filter(email__iexact=details["email"])
        if user:
            same = same.exclude(social__user=user)

        if same.exists():
            raise EmailAlreadyAssociated(backend, "E-mail exists")
