const StatusMap = new Map();
StatusMap.set(
  "deposit_confirmed",
  "We have confirmed your deposit 😎. A payout would be made to your account shortly"
);
StatusMap.set("payout_initiated", "Taadaa, We just sent out your money!🥁");
StatusMap.set(
  "payout_completed",
  "Whoop, Whoop!, Your account has been successfuly credited!"
);
StatusMap.set("failed", "Uh oh, We were unable to proceed with the payout!");

export const getNotificationMessage = (status: string) => {
  return StatusMap.get(status);
};
