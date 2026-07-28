# Firebase Setup

The app is configured for the Firebase project `tajweed-teaching`.

1. Enable the Email/Password provider in Authentication.
2. Create the teacher account in Authentication and copy its UID.
3. In Firestore, create `users/{TEACHER_UID}` with these fields:

```json
{
  "email": "teacher@example.com",
  "role": "teacher"
}
```

4. Copy `firestore.rules` into Firestore Database > Rules and publish them.
5. Add the local or deployed site domain under Authentication > Settings >
   Authorized domains.

Student accounts created from the Teacher Dashboard receive their Firestore role
automatically.

The app currently uses Firebase for:

- teacher/student user records
- teacher student profiles
- lesson template sync
- error logs

Booking, Google Calendar, and subscription collections are no longer used.
