// src/config/privateLeaderboard.js

/**
 * Private Leaderboard Configuration
 * 
 * Add emails of participants who should appear on the private leaderboard
 * This list is used to filter participants for the private view
 */

export const PRIVATE_LEADERBOARD_CONFIG = {
  // List of participant emails who should appear on private leaderboard
  // Add exactly 25 emails here
  participantEmails: [
    'revboss@gmail.com',
    'satwikrajv2@gmail.com',
    'sandhyanaseethalv@gmail.com',
    'tejashwini0302@gmail.com',
    'harshavardhanburra1@gmail.com',
    'g4neshhh674@gmail.com',
    'tannididurgakarthikeya@gmail.com',
    'swethachaganti15@gmail.com',
    'nathan.aryan14@gmail.com',
    'Sairam42090@gmail.com',
    'jellahansika258@gmail.com',
    'aditkgdgc@gmail.com',
    'arnavreddy196@gmail.com',
    'harshadityaadil19@gmail.com',
    'mahathik53@gmail.com',
    'sharonlillyy2@gmail.com',
    'sunayanagdgc@gmail.com',
    'reddy.official.31@gmail.com',
    'kotagiriasritha45@gmail.com',
    'kadalisowmya22@gmail.com',
    'vyshnaviyacha@gmail.com',
    'peratiakshitha40@gmail.com',
    'sharathknight831@gmail.com',
    'abdulamaan2903@gmail.com',
    'shishirreddy119@gmail.com',
    'hrishikeshcloud2@gmail.com'
  ],
  
  // Access control - Change this to a secure password
  // NOTE: For production, use environment variables instead
  accessPassword: 'GDGC2025', // Change this!
  
  // Private leaderboard title
  title: 'Private Leaderboard - Selected Participants',
  
  // Optional: Custom message for the private leaderboard
  description: 'This is a private leaderboard for selected participants only.'
};

/**
 * Check if a participant email is in the private list
 */
export const isPrivateParticipant = (email) => {
  return PRIVATE_LEADERBOARD_CONFIG.participantEmails.includes(email);
};

/**
 * Validate access password
 */
export const validateAccess = (password) => {
  return password === PRIVATE_LEADERBOARD_CONFIG.accessPassword;
};

