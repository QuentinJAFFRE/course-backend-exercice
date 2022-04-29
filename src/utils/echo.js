export const echo = async (req, res) => {
	res.write(req.body);
	res.end();
}
