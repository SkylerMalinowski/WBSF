/* ************************************************************************** */
// Written by: 		Skyler Malinowski
// Tested by: 		Skyler Malinowski
// Debugged by: 	Skyler Malinowski
// Integrated by: 	Skyler Malinowski
/* ************************************************************************** */

// Description: sets lesson if sesson id isn't blank.
// Input: none (type: void)
// Output: none (type: void)
function mySetLesson()
{
	if( window.name != '' )
	{
		setLesson(lessonNum,1);
	}
}

