// src/config/teams.js

// Unified password for all private leaderboards
export const UNIFIED_PASSWORD = process.env.PRIVATE_LEADERBOARD_PASSWORD || 'GDGC2025';

// Team configurations: teamId -> details
// Add/modify teams here. teamId is the URL segment after /private-leaderboard/
export const TEAMS = {
  'Sierra': {
    name: 'Sierra',
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
    description: 'Private leaderboard for Sierra'
  },
  'Ballari': {
    name: 'Ballari',
    participantEmails: [
      'parnika2205@gmail.com',
      'nithingoli1402@gmail.com',
      'abinayabuddarapu@gmail.com',
      'rajavarapusathwik3@gmail.com',
      'parthivreddyb62@gmail.com',
      'lakinya20@gmail.com',
      'praneethgdgc@gmail.com',
      'Dshreya2004.16@gmail.com',
      'suhaaa2911@gmail.com',
      'gnanasaichinta@gmail.com',
      'nonithrao24@gmail.com',
      'nandakishorecloud@gmail.com',
      'likhin705@gmail.com',
      'vivekkrishna211@gmail.com',
      'gmgole7@gmail.com',
      'hansikam.2912@gmail.com',
      'shashank22004@gmail.com',
      'likithasrii14@gmail.com',
      'yadavharshitha214@gmail.com',
      'abhinaymusku10@gmail.com'
    ],
    description: 'Private leaderboard for Ballari'
  },
  'Aatagallu': {
    name: 'Aatagallu',
    participantEmails: [
      'kateghardeepak.gcsj@gmail.com',
'swagathyadav09@gmail.com',
'sirvinitesh81@gmail.com',
'harshireddi7@gmail.com',
'Swathik092005@gmail.com',
'ramarthi.bhavyasri7@gmail.com',
'nikithamailaram1@gmail.com',
'Vakkapathishivarao@gmail.com',
'jananigoud24@gamil.com',
'shalem0210@gmail.com',
'pothugantimadhulika9@gmail.com',
'aravindmaggidi5@gmail.com',
'gajawadavineela01@gmail.com',
'rangarajdeepu@gmail.com',
'suchisadula789@gmail.com',
'sahithimarri26@gmail.com',
'vadlaharshitha08@gmail.com',
'keerthanabrahma09@gmail.com',
'ramarthi.bhavyasri7@gmail.com',
'ramyaa.redddy@gmail.com',
'mosesgondi0@gmail.com'
    ],
    description: 'Private leaderboard for Aatagallu'
  }

};

export const getTeam = (teamId) => TEAMS[teamId] || null;


