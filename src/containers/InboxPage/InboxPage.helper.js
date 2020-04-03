export const groupTransactions = ({ transactions, tab }) => {
  // console.log({ transactions });
  const transactionGroups = transactions.reduce((acc, tx) => {
    const bookingChainId = tx.attributes.protectedData.bookingChainId;

    let totalPrice, otherName;

    if ( tab === 'sales') {
      totalPrice = tx.attributes.payoutTotal.amount;
      otherName = tx.customer.attributes.profile.displayName;
    } else {
      totalPrice = tx.attributes.payinTotal.amount;
      otherName = tx.provider.attributes.profile.displayName;
    }

    const key = bookingChainId || tx.id.uuid;

    acc[key] = {
      ...acc[key],
      isBookingChain: !!bookingChainId,
      totalPrice: acc[key] ? acc[key].totalPrice + totalPrice : totalPrice,
      otherName,
    };

    acc[key].transactions = acc[key].transactions || [];
    acc[key].transactions.push(tx);

    return acc;
  }, {});
  // console.log({ transactionGroups });
  return Object.keys(transactionGroups).map((key) => {
    return {
      ...transactionGroups[key],
      key,
    }
  });
};
