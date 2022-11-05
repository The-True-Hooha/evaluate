import prisma from "../../../config/prisma.connect"

export default async function handler(req, res) {

  try {
    const getAll = await prisma.user.findMany({
      where: {
        isEnabled: false,
      },

      orderBy: {
        email: "asc",
        // best use case is to orderBy createdAt(Date/Time)
        //i agree
      },
    });
    if (getAll) {
      res.status(200).json({
        message: "returned all users awaiting access",
        data: getAll.map((v) => ({
          username: v.username,
          email: v.email,
        })),
      });
    }
  } catch (error) {
    res.status(404).json({
      message: `invalid request ${error}`,
    });
  }
}
