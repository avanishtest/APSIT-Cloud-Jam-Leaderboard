# Private Leaderboard Setup Guide

## Overview
A secure, password-protected private leaderboard that displays only 25 specific participants from your main CSV data.

## 🔧 Setup Instructions

### Step 1: Add the 25 Participant Emails

Edit the file: `src/config/privateLeaderboard.js`

Replace the placeholder emails with your 25 actual participant emails:

```javascript
participantEmails: [
  'participant1@example.com',
  'participant2@example.com',
  'participant3@example.com',
  // ... add all 25 emails
],
```

### Step 2: Set a Secure Password

In the same file, change the access password:

```javascript
accessPassword: 'YourSecurePassword123',  // Change this!
```

**⚠️ IMPORTANT:** For production deployment, use environment variables instead:
- Set `PRIVATE_LEADERBOARD_PASSWORD` in your environment
- Update the code to use: `process.env.PRIVATE_LEADERBOARD_PASSWORD`

### Step 3: Customize (Optional)

You can customize the title and description:

```javascript
title: 'Private Leaderboard - Selected Participants',
description: 'This is a private leaderboard for selected participants only.'
```

## 🚀 Usage

### Accessing the Private Leaderboard

1. Navigate to: `http://localhost:3000/private-leaderboard`
2. Enter the password you set in Step 2
3. View the filtered leaderboard with only your 25 participants

### URL Structure

- **Public Leaderboard**: `/` (all participants)
- **Private Leaderboard**: `/private-leaderboard` (25 selected participants only)

## 🔒 Security Features

1. **Password Protection**: Requires password to access
2. **Session Storage**: Password stored in browser session (cleared on tab close)
3. **API Validation**: Backend validates password before returning data
4. **Filtered Data**: Only returns data for the 25 configured emails

## 📊 Features

The private leaderboard includes:
- ✅ Same sorting logic as main leaderboard
- ✅ Search functionality
- ✅ Completion statistics
- ✅ View Details for each participant
- ✅ Responsive design
- ✅ Custom purple/blue theme to distinguish from public leaderboard

## 🔄 How It Works

1. User enters password on login page
2. Password is sent to `/api/private-leaderboard` endpoint via POST
3. API validates password
4. If valid, API reads CSV and filters for the 25 configured emails
5. Filtered data is returned and displayed
6. Password stored in sessionStorage for convenience (session only)

## 🛡️ Production Security Recommendations

For production deployment:

1. **Use Environment Variables**:
   ```bash
   # Add to .env.local
   PRIVATE_LEADERBOARD_PASSWORD=your-secure-password
   ```

2. **Update config to use env var**:
   ```javascript
   accessPassword: process.env.PRIVATE_LEADERBOARD_PASSWORD || 'fallback-password'
   ```

3. **Add IP Whitelisting** (optional):
   - Restrict access to specific IP addresses
   - Add middleware in Next.js

4. **Use JWT Tokens** (advanced):
   - Replace simple password with JWT authentication
   - Add expiration times

## 📝 Example Configuration

Here's a complete example:

```javascript
export const PRIVATE_LEADERBOARD_CONFIG = {
  participantEmails: [
    'kushwant.work@gmail.com',
    'kaustubhaatripuraribhatla@gmail.com',
    'parnika2205@gmail.com',
    'shivamruthreddyyella9@gmail.com',
    'malarouthusneha7@gmail.com',
    'abinayabuddarapu@gmail.com',
    'vijaygdgc@gmail.com',
    'nathan.aryan14@gmail.com',
    'vivekkrishna211@gmail.com',
    'joelmekala492@gmail.com',
    'nithingoli1402@gmail.com',
    'likhin705@gmail.com',
    'gmgole7@gmail.com',
    'gnanasaichinta@gmail.com',
    'parthivreddyb62@gmail.com',
    'swethachaganti15@gmail.com',
    'shashank22004@gmail.com',
    'suhaaa2911@gmail.com',
    'aditkgdgc@gmail.com',
    'srujalmlrit@gmail.com',
    'ssamuelpramodd@gmail.com',
    'devarshinibegari@gmail.com',
    'hasadhikathottempudi9@gmail.com',
    'vaishnaviyadavvvv@gmail.com',
    'mdabdulrahaman5542@gmail.com'
  ],
  accessPassword: 'CloudJam2025!',
  title: 'Top Performers - Private Leaderboard',
  description: 'Exclusive leaderboard for our top 25 participants'
};
```

## 🐛 Troubleshooting

**Issue**: "Invalid password" error
- **Solution**: Check that password in config matches what you're entering

**Issue**: Participant not showing up
- **Solution**: Verify email in config exactly matches email in CSV (case-sensitive)

**Issue**: No participants showing
- **Solution**: Check that at least one email in config exists in your CSV file

## 📞 Support

For issues or questions, check:
- Configuration file: `src/config/privateLeaderboard.js`
- API endpoint: `src/app/api/private-leaderboard/route.js`
- Page component: `src/app/private-leaderboard/page.js`


