import "server-only";
import { delay } from "./delay";
import prisma from "@/lib/prisma";

export const getAttendeesCountForDashboard = async (userId: number) => {
  await delay();

  const rsvps = await prisma.rSVP.findMany({
    where: {
      event: {
        createdById: userId,
      },
    },
    select: {
      attendeeId: true,
      eventId: true,
    },
  });

  // Count unique attendee per event
  const uniqueAttendeeIdsPerEvent = new Map<number, Set<number>>();

  for (const rsvp of rsvps) {
    if (!uniqueAttendeeIdsPerEvent.has(rsvp.eventId)) {
      uniqueAttendeeIdsPerEvent.set(rsvp.eventId, new Set());
    }
    uniqueAttendeeIdsPerEvent.get(rsvp.eventId)!.add(rsvp.attendeeId);
  }

  // Sum up total distinct attendees across all events
  let total = 0;
  for (const attendees of uniqueAttendeeIdsPerEvent.values()) {
    total += attendees.size;
  }

  return total;
};
