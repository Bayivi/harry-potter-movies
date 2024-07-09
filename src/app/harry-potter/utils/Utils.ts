export class Utils {
  public static transformDuration(durationStr: string | undefined): string {
    const durationNum = Number(durationStr)
    const hours = Math.floor(durationNum / 60);
    const minutes = durationNum % 60;
    return hours + 'h ' + minutes + 'min';
  }

  public static transformBudget(budget: string | undefined): string {
    return `$${budget} million`
  }
}
