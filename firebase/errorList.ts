export const authErrors: Record<string, string> = {
  // General Authentication Errors
  "auth/invalid-email": "The email address is badly formatted.",
  "auth/user-disabled":
    "The user account has been disabled by an administrator.",
  "auth/user-not-found": "No user found with this email address.",
  "auth/wrong-password": "The password is incorrect for the given email.",
  "auth/email-already-in-use": "The email is already registered.",
  "auth/weak-password":
    "The password is too weak (must be at least 6 characters).",
  "auth/operation-not-allowed": "This authentication method is not enabled.",
  "auth/too-many-requests": "Too many failed attempts. Try again later.",
  "auth/network-request-failed":
    "Network error occurred. Check your internet connection.",
  "auth/requires-recent-login":
    "You need to reauthenticate to perform this action.",
  "auth/provider-already-linked":
    "This account is already linked to another provider.",
  "auth/credential-already-in-use":
    "This credential is already linked to another account.",

  // Account Verification & Password Reset Errors
  "auth/invalid-action-code":
    "The action code (password reset, email verification) is invalid or expired.",
  "auth/expired-action-code": "The action code has expired.",
  "auth/missing-email": "An email address is required for this action.",
  "auth/missing-password": "A password is required for this action.",

  // Multi-Factor Authentication (MFA) Errors
  "auth/multi-factor-auth-required":
    "Multi-factor authentication is required to complete this request.",
  "auth/missing-multi-factor-info":
    "Multi-factor authentication information is missing.",
  "auth/multi-factor-info-not-found":
    "The provided multi-factor authentication information was not found.",

  // Phone Authentication Errors
  "auth/invalid-phone-number": "The phone number provided is invalid.",
  "auth/missing-phone-number": "A phone number is required for this action.",
  "auth/quota-exceeded":
    "The SMS quota for phone authentication has been exceeded.",
  "auth/captcha-check-failed":
    "The CAPTCHA verification failed. Please try again.",

  // Custom Token & Provider Errors
  "auth/invalid-custom-token": "The provided custom token is invalid.",
  "auth/custom-token-mismatch":
    "The custom token does not match the expected provider.",
  "auth/unauthorized-domain":
    "Authentication request is from an unauthorized domain.",

  // Additional Firebase Errors
  "auth/app-deleted": "The Firebase project has been deleted.",
  "auth/app-not-authorized":
    "The app is not authorized to use Firebase Authentication.",
  "auth/argument-error": "An invalid argument was provided.",
  "auth/invalid-api-key": "The provided API key is invalid.",
  "auth/invalid-credential":
    "The supplied credential is incorrect or has expired.",
  "auth/session-cookie-expired":
    "The session cookie has expired. Please sign in again.",
  "auth/uid-already-exists": "The provided UID is already in use.",
};
