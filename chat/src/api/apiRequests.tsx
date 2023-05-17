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
