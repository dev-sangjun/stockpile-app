# Stockpile
- Personalized stock tracking & mock investing app
## About the Project
- This project was created to solve the following issues with most stock/investment apps in the market:
	1. Users have to share bank information with Plaid in order to import investments
  2. Allow only certain brokerages/banks that are listed in Plaid
  3. Users cannot manually add/update/delete investments
  4. Don't have functionality to create portfolios & add investments

- I brought the following solutions to resolve the above concerns:
	1. Calculates total balance of the user's entire assets & shows progress based on the user's goal amount
  2. Allows users to create portfolios & add investments by submitting purchase price & quantity 
	3. Uses JWT access & refresh token for authentication
  4. Runs a cron job every 5 minutes to update stock prices during the US stock market hours
  5. Built as a PWA and supports responsive design for desktop & mobile devices using Tailwind CSS

## Built With
### Tech Stack
- React
- Redux
- Tailwind CSS
- TypeScript
- Express
- PostgreSQL
- Prisma
- Heroku

### Languages
-	TypeScript
### 

## Getting Started
- Go to https://www.stockpile.fyi
- Create a new account
- Create a new portfolio & add investments by submitting a stock symbol, quantity, and price
- Add your favorite investments to track it in the Dashboard
- Click on the refresh button in the Dashboard to refetch the data
