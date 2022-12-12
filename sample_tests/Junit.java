import org.junit.Test;
import static org.junit.Assert.*;

public class SolutionTest {

    @Test
    public void testAdd1() {
        int[] array = new int[]{ 3, 4, 5 };
        Solution solution = new Solution();
        int result = solution.arrayLen(array);
        assertEquals(array.length, result);
    }
    @Test
    public void testAdd2() {
        int[] array = new int[]{ 3, 4, 5, 10, 4};
        Solution solution = new Solution();
        int result = solution.arrayLen(array);
        assertEquals(array.length, result);
    }
    @Test
    public void testAdd3() {
        int[] array = new int[]{ 3, 4, 5, 9, 3, 2, 1 };
        Solution solution = new Solution();
        int result = solution.arrayLen(array);
        assertEquals(array.length, result);
    }
}