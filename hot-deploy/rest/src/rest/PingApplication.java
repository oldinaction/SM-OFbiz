package rest;

import java.util.HashSet;
import java.util.Set;
 
import javax.ws.rs.core.Application;
 
public class PingApplication extends Application {
  @Override
  public Set<Class<?>> getClasses() {
      Set<Class<?>> classes = new HashSet<Class<?>>();
      classes.add(PingResource.class);
      return classes;
  }
}
