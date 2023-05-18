export async function getAccountStatus(
  idInstance: string,
  apiTokenInstance: string
): Promise<string | { stateInstance: string } | undefined> {
  try {
    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );
    if (!response.ok) {
      throw new Error(`${response.status}:${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

export async function sendMessage(
  idInstance: string,
  apiTokenInstance: string,
  data: { chatId: string; message: string }
) {
  try {
    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`${response.status}:${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

interface Notification {
  receiptId: number;
  body: Reply;
}

interface Reply {
  idMessage: string;
  instanceData: object;
  messageData: { typeMessage: string; textMessageData: { textMessage: string } };
  senderData: object;
  timestamp: number;
  typeWebhook: string;
}

export async function getNotification(
  idInstance: string,
  apiTokenInstance: string
): Promise<string | Notification | undefined> {
  try {
    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );
    if (!response.ok) {
      throw new Error(`${response.status}:${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

export async function deleteNotification(
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number
) {
  await fetch(
    `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: 'DELETE',
    }
  );
}
