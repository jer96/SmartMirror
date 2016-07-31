import java.awt.Dimension;
import java.awt.Robot;
import java.awt.event.InputEvent;
import java.io.IOException;
import com.leapmotion.leap.CircleGesture;
import com.leapmotion.leap.Controller;
import com.leapmotion.leap.Finger;
import com.leapmotion.leap.Frame;
import com.leapmotion.leap.Gesture;
import com.leapmotion.leap.InteractionBox;
import com.leapmotion.leap.Listener;
import com.leapmotion.leap.Vector;
/*
 * Jeremiah Bill
 * Mouse.java used to allow Leap motion controller to transform finger into mouse
 * use index finger to move mouse, circle gesture to scroll, use middle finger to execute tapping gesture to click 
 * Be sure to add Leap.jar to classpath to ensure programs runs 
 * https://developer.leapmotion.com/documentation/javascript/index.html
 */
public class Mouse extends Listener {
	//used to dictate mouse controls
	Robot robot;

	public static void main(String[] args) {
		Mouse mouse = new Mouse();
		Controller control = new Controller();
		control.addListener(mouse);
		try{
			System.in.read();
		}
		catch(IOException e){
			e.printStackTrace();

		}

		control.removeListener(mouse);

	}

	public void onDisconnect(Controller controller){
		System.out.println("Disconnnected");
	}
	public void onExit(Controller controller){
		System.out.println("Exit");
	}
	public void onInit(Controller controller){
		System.out.println("Init");
	}
	public void onConnect (Controller controller){
		System.out.println("Connected");
		controller.enableGesture(Gesture.Type.TYPE_SWIPE);
		controller.enableGesture(Gesture.Type.TYPE_CIRCLE);
		controller.enableGesture(Gesture.Type.TYPE_KEY_TAP);
		controller.enableGesture(Gesture.Type.TYPE_SCREEN_TAP);

	}
	//Handles gestures and finger movement 
	public void onFrame(Controller controller) {
		try{
			robot = new Robot();
		}
		catch(Exception e){
			System.out.println("Exception");
		}
		Frame frame = controller.frame();
		InteractionBox box =  frame.interactionBox();
		//translate finger location to mouse location
		for(Finger f : frame.fingers()){
			if(f.type() == Finger.Type.TYPE_INDEX){
				Vector position = f.stabilizedTipPosition();
				Vector normalizePos = box.normalizePoint(position);
				Dimension screen = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
				robot.mouseMove((int) (screen.width * normalizePos.getX()) , (int)(screen.height - normalizePos.getY() * screen.height));
			}
		}

		//handle gesures
		if(!frame.gestures().isEmpty()){
			for(Gesture g : frame.gestures()){
				if(g.type() == Gesture.Type.TYPE_KEY_TAP){
					System.out.println("Mouse click");
					robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
					robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);

				}
				else if(g.type() == Gesture.Type.TYPE_CIRCLE){
					System.out.println("Scrolling");
					CircleGesture circle = new CircleGesture(g);
					if(circle.pointable().direction().angleTo(circle.normal())<= Math.PI/4){
						robot.mouseWheel(1);
						try{
							Thread.sleep(50);
						}
						catch(Exception e){
							System.out.println(e);
						}
					}
					else{
						robot.mouseWheel(-1);
						try{
							Thread.sleep(50);
						}
						catch(Exception e){
							System.out.println(e);
						}
					}
				}

			}
		}
	}
}
