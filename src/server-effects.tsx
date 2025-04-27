import {iAlertsContext} from "./components/App/interfaces";

export function onUpdateFactory(field: string, dataId: number, alerts: iAlertsContext["alerts"], setAlerts: iAlertsContext["setAlerts"]) {
  // I decided I couldn't bear to write a new update function for every cell type when they were all so similar. This approach still has the issue
  // that a new function is created for every updated cell, which is terribly inefficient, but at least the duplicated logic is broken out.
  // I also don't like the hack of passing in the alerts context here, that's one of the things I would change first if I had more time with
  // this application.
  const onUpdate = async (val: string[]) => {
    const baseServerUri = import.meta.env.VITE_SERVER_PROTO + "://" + import.meta.env.VITE_SERVER_HOST + (import.meta.env.VITE_SERVER_PORT ? ":" + import.meta.env.VITE_SERVER_PORT : "");
    const updateData = async () => {
      const response = await fetch(baseServerUri + "/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: dataId, values: [{column: field, value: val}]}),
      });
      if (!response.ok) {
        // Not really happy with this method of adding an error and making it disappear after a certain time. I'd prefer to spend more time building out
        // a whole alert system, especially if we had something like redux instead of a shared context, but for one or two components this will work
        setAlerts(alerts.concat({severity: "error", message: `Network response was not ok when updating users in row ${dataId} (${response.status}: ${response.statusText})`}));
        setTimeout(() => setAlerts(alerts.slice(1)), 7000)
      }
      return response.ok;
    }

    const success = await updateData();
    return success;
  }
  return onUpdate;
}