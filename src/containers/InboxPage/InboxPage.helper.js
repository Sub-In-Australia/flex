export const groupTransactions = (transactions) => {
  console.log({ transactions });
  const transactionGroups = transactions.reduce((acc, tx) => {
    const bookingChainId = tx.attributes.protectedData.bookingChainId;
    const payinTotal = tx.attributes.payinTotal.amount;

    const key = bookingChainId || tx.id.uuid;

    acc[key] = {
      ...acc[key],
      isBookingChain: !!bookingChainId,
      payinTotal: acc[key] ? acc[key].payinTotal + payinTotal : payinTotal,
    };

    acc[key].transactions = acc[key].transactions || [];
    acc[key].transactions.push(tx);

    return acc;
  }, {});
  console.log({ transactionGroups });
  return transactionGroups;
};
