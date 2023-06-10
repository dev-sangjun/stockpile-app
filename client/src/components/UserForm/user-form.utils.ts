export const getUserFormTexts = (isSignIn: boolean) => ({
  title: isSignIn ? "Sign in" : "Sign up",
  greetings: isSignIn
    ? "Welcome back! Let's verify your identity."
    : "Welcome! Please enter your details to sign up.",
  action: isSignIn ? "Sign in" : "Sign up",
  transition: isSignIn ? "Don't have an account?" : "Already have an account?",
  transitionButton: isSignIn ? "Sign up" : "Sign in",
});
